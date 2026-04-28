export class DatabaseConnector {
  private static instance: DatabaseConnector;

  private DatabaseConnector() {
    //Private constructor
  }

  public static getInstance() {
    if (!DatabaseConnector.instance) {
      DatabaseConnector.instance = new DatabaseConnector();
    }
    return DatabaseConnector.instance;
  }
}
