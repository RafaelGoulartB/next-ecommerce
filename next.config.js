module.exports = {
  pageExtensions: ['js'],
  images: {
    domains: ['m.media-amazon.com'],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/pages/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://82c1-18-228-40-209.ngrok.io' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ]
      }
    ]
  },
  reactStrictMode: true,
};
