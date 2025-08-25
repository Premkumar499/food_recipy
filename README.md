# Recipe Finder App

A modern React TypeScript application for discovering and viewing recipes. Built with Vite, Tailwind CSS, and json-server for mock API functionality.

## Features

- 🔍 **Search Recipes**: Find recipes by name or ingredients
- 🏷️ **Category Browsing**: Explore recipes by category (Italian, Indian, Dessert, etc.)
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean interface with Tailwind CSS
- 📄 **Pagination**: Browse through recipes with pagination
- 📖 **Recipe Details**: View detailed recipe information with ingredients and instructions
- 🎯 **Category Pages**: Dedicated pages for each recipe category with filtered results
- ⚡ **Fast Loading**: Built with Vite for optimal performance
- 🔄 **Error Handling**: Graceful error handling for API failures

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Mock API**: json-server
- **Package Manager**: npm

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- npm (comes with Node.js)

## Installation

1. **Install Node.js** (if not already installed):
   - Download and install from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

2. **Install project dependencies**:
   ```bash
   npm install
   ```

## Available Scripts

### Development

Start the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:3003` (or the next available port)

### Mock API Server

Start the json-server for mock API:
```bash
npm run server
```
The API will be available at `http://localhost:3002`

### Build

Build the app for production:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── SearchBar.tsx   # Search functionality
│   ├── RecipeCard.tsx  # Recipe card component
│   ├── RecipeList.tsx  # List of recipe cards
│   ├── RecipeDetails.tsx # Detailed recipe view
│   └── Pagination.tsx  # Pagination component
├── pages/              # Page components
│   ├── HomePage.tsx    # Home page with search and recipes
│   └── RecipeDetailPage.tsx # Individual recipe details
├── types/              # TypeScript type definitions
│   └── index.ts        # All type definitions
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## API Endpoints

The mock API server provides the following endpoints:

- `GET /recipes` - Get all recipes (supports pagination and search)
- `GET /recipes/:id` - Get a specific recipe by ID
- `GET /recipes?_page=1&_limit=8` - Paginated recipes
- `GET /recipes?q=search_term` - Search recipes

## Usage

1. **Start both servers**:
   ```bash
   # Terminal 1 - Start the development server
   npm run dev
   
   # Terminal 2 - Start the mock API server
   npm run server
   ```

2. **Browse recipes**:
   - Visit `http://localhost:3003` to see the home page
   - Use the search bar to find specific recipes
   - Browse recipes by category using the category filter
   - Click on recipe cards to view detailed information
   - Click on category badges to see recipes in that category
   - Navigate between pages using pagination

3. **View recipe details**:
   - Click any recipe card to view detailed information
   - See ingredients with checkboxes for cooking
   - Follow step-by-step instructions
   - Use the back button to return to the recipe list

## Key Features Implemented

### Components
- **SearchBar**: Reusable search component with callback props
- **RecipeCard**: Displays recipe preview with image, title, category, and metadata
- **RecipeList**: Renders a grid of recipe cards with loading and error states
- **RecipeDetails**: Full recipe view with ingredients and instructions
- **Pagination**: Handle navigation through multiple pages of recipes

### Pages
- **HomePage**: Main page with search functionality and recipe grid
- **RecipeDetailPage**: Individual recipe details with full information

### Technical Features
- **TypeScript**: Full type safety with interfaces and proper typing
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Error Handling**: Graceful handling of API failures with fallback data
- **Loading States**: Loading spinners and proper state management
- **Routing**: Client-side routing with React Router
- **Conditional Rendering**: Smart rendering based on data state

## Customization

### Adding New Recipes
Edit the `db.json` file to add new recipes. Each recipe should follow this structure:

```json
{
  "id": "unique_id",
  "title": "Recipe Name",
  "image": "image_url",
  "category": "Category",
  "cookingTime": 30,
  "servings": 4,
  "difficulty": "Easy|Medium|Hard",
  "rating": 4.5,
  "ingredients": [
    {
      "id": "1",
      "name": "Ingredient name",
      "amount": "1",
      "unit": "cup"
    }
  ],
  "instructions": [
    "Step 1 instructions",
    "Step 2 instructions"
  ]
}
```

### Styling
The app uses Tailwind CSS. You can customize the design by:
- Modifying the `tailwind.config.js` file
- Adding custom CSS classes in `src/index.css`
- Updating component styles in individual component files

## Troubleshooting

### Common Issues

1. **Node.js not found**:
   - Make sure Node.js is installed and added to your system PATH
   - Restart your terminal after installation

2. **Port already in use**:
   - Change the port in `vite.config.ts` for the dev server
   - Change the port in `package.json` for the json-server

3. **API connection issues**:
   - Make sure both servers are running
   - Check that json-server is running on port 3001
   - Verify the API endpoints in the browser

4. **Build errors**:
   - Run `npm install` to ensure all dependencies are installed
   - Check for TypeScript errors in the terminal

## Learning Objectives

This project demonstrates:

- **React Props**: Proper prop passing and component communication
- **TypeScript**: Type-safe React development
- **Routing**: Client-side navigation with React Router
- **State Management**: useState and useEffect hooks
- **API Integration**: Fetching data from REST APIs
- **Error Handling**: Graceful error handling and fallbacks
- **Responsive Design**: Mobile-first CSS with Tailwind
- **Component Architecture**: Reusable and maintainable components
- **Project Structure**: Clean and organized file structure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
"# food_recipy" 
