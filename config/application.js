export default {
  test: {
    google_analytics: {
      tracking_id: 'UA-XXXXX-Y'
    }
  },
  development: {
    google_analytics: {
      tracking_id: 'UA-XXXXX-Y'
    }
  },
  production: {
    google_analytics: {
      tracking_id: 'UA-91813851-1'
    }
  }
}[process.env.NODE_ENV || 'development']
