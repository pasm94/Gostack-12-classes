module.exports = {
    presets: [
        '@babel/preset-env', /* converts the js code in a oldest js code that all browser can understand. Will convert based on necessities from the place that its running */
        '@babel/preset-react' /* understand html inside js */
    ],
    plugins: [
        '@babel/plugin-transform-runtime'
    ]
}
// presets: applications developed by other people that we can use
// that config is standard, and we will use in all react projects