export const config = {
  app: {
    baseUrl: process.env.BASE_URL,
  },
  api: {
    baseUrl: process.env.API_BASE_URL,
    key: process.env.API_KEY,
  },
  db: {
    connString: process.env.ATLAS_CONNECTION,
    name: process.env.MONGODB_NAME,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
  },
  email: {
    port: process.env.EMAIL_PORT,
    host: process.env.EMAIL_HOST,
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
    sendGridKey: process.env.SENDGRID_API_KEY,
    contactFormSendFrom: process.env.CONTACT_EMAIL_SEND_TO,
    contactFormSubject: process.env.CONTACT_EMAIL_SUBJECT,
  },
  auth: {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    apiAudience: process.env.AUTH0_AUDIENCE,
    apiAccessTokenUrl: process.env.AUTH0_ACCESS_TOKEN_URL,
    apiSecret: process.env.AUTH0_API_SECRET,
  },
}

export default config
