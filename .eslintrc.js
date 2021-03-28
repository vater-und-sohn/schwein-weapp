module.exports = {
  extends: ['taro/react', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
  },
};
