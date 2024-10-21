import { Recipe, RecipeType } from "./recipe";
import { Store } from "./stores/store.type";

export async function list(store: Store<RecipeType[]>, args: string[]) {
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const formatted = recipes
    .map((recipe) => `- [${recipe.id}] ${recipe.name}`)
    .join('\n');
  console.log('Your recipes:');
  console.log(formatted);
}


export async function details(store: Store<RecipeType[]>, args: string[]) {
  const id = args[0];
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const foundRecipe = recipes.find(recipe => recipe.id === Number(id));
  if (!foundRecipe) {
    console.error(`Recipe with ID ${id} not found.`);
  } else {
    console.log(`ID: ${foundRecipe.id}`);
    console.log(`Name: ${foundRecipe.name}`);
  }

}
