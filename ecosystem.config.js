module.exports = {
    apps: [
        {
            name: "ecp_web_api",
            script: "./index.js",
            instances: 2,
            exec_mode: "cluster",
            watch: true,
            increment_var: 'PORT',
            env: {
                "PORT": 9000,
                "NODE_ENV": "development"
            }
        }
    ]
}