module.exports = {
    publicPath: "/chat-design-vue/",
    devServer: {
        proxy: {
            '^/clients': {
                target: 'https://sellia-web-page-test.s3.us-east-2.amazonaws.com/clients.json',
                changeOrigin: true,
                pathRewrite: {
                    '^/clients': ''
                }
            },
            '^/client1/messages': {
                target: 'https://sellia-web-page-test.s3.us-east-2.amazonaws.com/629a8125b2d313190810212f.json',
                changeOrigin: true,
                pathRewrite: {
                    '^/client1/messages': ''
                }
            },
            '^/client2/messages': {
                target: 'https://sellia-web-page-test.s3.us-east-2.amazonaws.com/629e39e8b2d31319081e0650.json',
                changeOrigin: true,
                pathRewrite: {
                    '^/client2/messages': ''
                }
            }
        }
    }
};