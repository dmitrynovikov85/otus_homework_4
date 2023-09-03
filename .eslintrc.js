{
    "root": true,
    "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
    "plugin:prettier/recommended"
],
    "globals": {
    "require": true,
        "process": true,
        "module": true
},
    "rules": {
    "strict": 0,
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
        "error",
        {
            "vars": "all",
            "args": "none"
        }
    ],
        "no-extra-boolean-cast": "off",
        "no-inner-declarations": "off",
        "no-console": "error",
        "prettier/prettier": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/consistent-type-imports": "error",
        "vue/multi-word-component-names": "off"
},
    "parserOptions": {
    "ecmaVersion": "latest"
},
    "ignorePatterns": ["generated/"]
}
