import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() => runApp(const RecipeApp());

class RecipeApp extends StatelessWidget {
  const RecipeApp({super.key});
  @override
  Widget build(BuildContext context) => MaterialApp(
        title: 'Recipe Finder',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          colorSchemeSeed: Colors.deepOrange,
          useMaterial3: true,
        ),
        home: const HomeScreen(),
      );
}

// ---------- Model ----------
class Recipe {
  final String id, name, category, area, instructions, image, youtube;
  final List<String> ingredients;

  Recipe({
    required this.id,
    required this.name,
    required this.category,
    required this.area,
    required this.instructions,
    required this.image,
    required this.youtube,
    required this.ingredients,
  });

  factory Recipe.fromJson(Map<String, dynamic> j) {
    final items = <String>[];
    for (var i = 1; i <= 20; i++) {
      final ing = (j['strIngredient$i'] ?? '').toString().trim();
      final mea = (j['strMeasure$i'] ?? '').toString().trim();
      if (ing.isNotEmpty) items.add('$mea $ing'.trim());
    }
    return Recipe(
      id: j['idMeal'] ?? '',
      name: j['strMeal'] ?? '',
      category: j['strCategory'] ?? '',
      area: j['strArea'] ?? '',
      instructions: j['strInstructions'] ?? '',
      image: j['strMealThumb'] ?? '',
      youtube: j['strYoutube'] ?? '',
      ingredients: items,
    );
  }
}

// ---------- API ----------
class RecipeApi {
  static const _base = 'https://www.themealdb.com/api/json/v1/1';

  static Future<List<Recipe>> search(String query) async {
    final res = await http.get(Uri.parse('$_base/search.php?s=$query'));
    if (res.statusCode != 200) throw Exception('Server error ${res.statusCode}');
    final meals = jsonDecode(res.body)['meals'] as List?;
    return meals?.map((m) => Recipe.fromJson(m)).toList() ?? [];
  }
}

// ---------- Home ----------
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _controller = TextEditingController();
  List<Recipe> _recipes = [];
  bool _loading = false;
  String? _error;
  bool _searched = false;

  @override
  void initState() {
    super.initState();
    _search('chicken');
  }

  Future<void> _search(String q) async {
    if (q.trim().isEmpty) return;
    setState(() {
      _loading = true;
      _error = null;
      _searched = true;
    });
    try {
      final r = await RecipeApi.search(q.trim());
      setState(() => _recipes = r);
    } catch (e) {
      setState(() => _error = 'Could not load recipes. Check your internet.');
    } finally {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('🍳 Recipe Finder')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(12),
            child: TextField(
              controller: _controller,
              textInputAction: TextInputAction.search,
              onSubmitted: _search,
              decoration: InputDecoration(
                hintText: 'Search recipes (e.g. pasta, biryani)',
                prefixIcon: const Icon(Icons.search),
                suffixIcon: IconButton(
                  icon: const Icon(Icons.arrow_forward),
                  onPressed: () => _search(_controller.text),
                ),
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30)),
              ),
            ),
          ),
          Expanded(child: _body()),
        ],
      ),
    );
  }

  Widget _body() {
    if (_loading) return const Center(child: CircularProgressIndicator());
    if (_error != null) return Center(child: Text(_error!));
    if (_searched && _recipes.isEmpty) {
      return const Center(child: Text('No recipes found. Try another search.'));
    }
    return GridView.builder(
      padding: const EdgeInsets.all(12),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        childAspectRatio: 0.8,
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
      ),
      itemCount: _recipes.length,
      itemBuilder: (_, i) {
        final r = _recipes[i];
        return GestureDetector(
          onTap: () => Navigator.push(context,
              MaterialPageRoute(builder: (_) => DetailScreen(recipe: r))),
          child: Card(
            clipBehavior: Clip.antiAlias,
            elevation: 3,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Hero(
                    tag: r.id,
                    child: Image.network(r.image,
                        width: double.infinity,
                        fit: BoxFit.cover,
                        errorBuilder: (_, __, ___) =>
                            const Icon(Icons.restaurant, size: 48)),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(r.name,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(fontWeight: FontWeight.bold)),
                      Text('${r.category} • ${r.area}',
                          style: const TextStyle(fontSize: 12)),
                    ],
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}

// ---------- Detail ----------
class DetailScreen extends StatelessWidget {
  final Recipe recipe;
  const DetailScreen({super.key, required this.recipe});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(recipe.name)),
      body: ListView(
        children: [
          Hero(
            tag: recipe.id,
            child: Image.network(recipe.image,
                height: 250, width: double.infinity, fit: BoxFit.cover),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Wrap(spacing: 8, children: [
                  Chip(label: Text(recipe.category)),
                  Chip(label: Text(recipe.area)),
                ]),
                const SizedBox(height: 12),
                Text('Ingredients',
                    style: Theme.of(context).textTheme.titleLarge),
                const SizedBox(height: 8),
                ...recipe.ingredients.map((i) => Padding(
                      padding: const EdgeInsets.symmetric(vertical: 2),
                      child: Text('• $i'),
                    )),
                const SizedBox(height: 16),
                Text('Instructions',
                    style: Theme.of(context).textTheme.titleLarge),
                const SizedBox(height: 8),
                Text(recipe.instructions, style: const TextStyle(height: 1.5)),
                if (recipe.youtube.isNotEmpty) ...[
                  const SizedBox(height: 16),
                  Text('Video: ${recipe.youtube}',
                      style: const TextStyle(color: Colors.blue)),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}
