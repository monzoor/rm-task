module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    globals: {
        document: false,
    },
    extends: ['plugin:jsx-a11y/recommended'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react-hooks'],
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/prop-types': 0,
        'react/no-did-update-set-state': 0,
        'import/no-named-as-default-member': 0,
        'import/no-named-as-default': 0,
        'import/named': 0,
        'no-nested-ternary': 0,
        'no-console': process.env.NODE_ENV === 'production' ? 0 : 0,
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/prefer-stateless-function': 0,
        'react/jsx-indent': [2, 4],
        'max-len': 0,
        indent: [2, 4, { ignoredNodes: ['JSXElement *'] }],
        'linebreak-style': [2, 'unix'],
        quotes: [2, 'single'],
        semi: [2, 'always'],
    },
};
