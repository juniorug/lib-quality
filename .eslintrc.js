module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json',
    },
    extends:  [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',  // Adiciona as recomendações padrões @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint',  // Adiciona as configurações do prettier para evitar conflitos de regras @typescript-eslint/eslint-plugin
        'plugin:prettier/recommended',  // Adiciona o plugin do prettier
    ],
    settings: {
        "import/resolver": {
          typescript: {} // this loads <rootdir>/tsconfig.json to eslint
        },
    },
    rules: {
        "import/extensions": [
           "error",
           "ignorePackages",
           {
             "js": "never",
             "jsx": "never",
             "ts": "never",
             "tsx": "never"
           }
        ]
     }
}