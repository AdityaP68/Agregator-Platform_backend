import app from "./src/app.js";
import config from "./src/config/config.js";

const { PORT } = config;

app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
