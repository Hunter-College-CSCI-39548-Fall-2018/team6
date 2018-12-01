import org.apache.commons.configuration2.Configuration;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class LoadSQL {
    public static void main(String... args) {
        // removes tables
        initializeTables("src/test/resources/clean/");

        // creates tables
        initializeTables("src/test/resources/schema/");

        String csvRoot = "DATA/csv/";

        loadCSV(csvRoot + "Airport_Codes.csv", "Airport_Codes");
        loadCSV(csvRoot + "Airport_Passengers.csv", "Airport_Passengers");
        loadCSV(csvRoot + "Airport_Traffic.csv", "Airport_Traffic");
        loadCSV(csvRoot + "City_Populations.csv", "Airport_Traffic");
        loadCSV(csvRoot + "Climate.csv", "Climate");
        loadCSV(csvRoot + "Cost_Indexes.csv", "Cost_Indexes");
        loadCSV(csvRoot + "Fares.csv", "Fares");
        loadCSV(csvRoot + "States.csv", "States");
    }

    private static void initializeTables(String schemaPath) {
        Setup setup = new Setup();
        Connection connection = getSQLConnection(setup);
        for (String sql : getTableSchemas(schemaPath)) {
            try {
                System.out.println("sql = " + sql);
                connection.setAutoCommit(false);
                Statement stmt = connection.createStatement();
                stmt.execute(sql);
                connection.commit();
            } catch (NullPointerException | SQLException e) {
                System.err.println("Could not execute SQL!");
                e.printStackTrace();
            }
        }
        try {
            System.err.println("Closing MySQL connection.");
            connection.close();
        } catch (NullPointerException | SQLException e) {
            System.err.println("Could not close SQL Connection.");
        }
    }

    private static Connection getSQLConnection(Setup setup) {
        try {
            Configuration mysqlConfig = setup.getConfig();

            String url = mysqlConfig.getString("mysql.url");
            String username = mysqlConfig.getString("mysql.username");
            String password = mysqlConfig.getString("mysql.password");

            return DriverManager.getConnection(url, username, password);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    private static String[] loadCSV(String filePath, String tableName) {
        File basePath = new File(".");
        File file = new File(filePath);

        String headers;

        try {
            BufferedReader br = new BufferedReader(new FileReader(file));
            // skip header line
            headers = br.readLine().replace("\n", "");
            ArrayList<String> dataList = new ArrayList<>();
            while (br.ready()) {
                String line = br.readLine();
                dataList.add(line);
            }

            ArrayList<String> types = new ArrayList<>();
            try {
                types = getHeaderTypes(tableName);
            } catch (SQLException e) {
                e.printStackTrace();
            }

            Setup setup = new Setup();
            Connection connection = getSQLConnection(setup);

            try {
                Statement stmt = connection.createStatement();
                for (String line : dataList) {
                    connection.setAutoCommit(false);
                    System.out.println("line = " + line);
                    String query = buildInsertQuery(tableName, line, types);
                    System.out.println("query = " + query);
                    stmt.execute(query);
                    connection.commit();
                }
            } catch (SQLException | NullPointerException e) {
                System.err.println("Could not execute SQL!");
                e.printStackTrace();
            }
//        String queryFormat = buildQuery(schemaPath);
//        loadCSV(connection, filePath, queryFormat);
            try {
                connection.close();
            } catch (Exception e) {
                System.err.println("Could not close SQL Connection.");
                e.printStackTrace();
            }
        } catch (IOException | NullPointerException e) {
            System.err.println("Could not find/load target CSV file!");
            e.printStackTrace();
        }
        return null;
    }

    private static List<String> getTableSchemas(String schemaPath) {
        List<String> sqlArray = new ArrayList<>();
        for (final File fileEntry : new File(schemaPath).listFiles()) {
            try {
                StringBuilder sb = new StringBuilder();
                BufferedReader br = new BufferedReader(new FileReader(fileEntry));
                while (br.ready()) {
                    sb.append(br.readLine());
                }
                String queries = sb.toString();
                for (String query : queries.split(";")) {
                    sqlArray.add(query + ";");
                }

            } catch (IOException e) {
                System.err.println("Error opening file at " + fileEntry);
                e.printStackTrace();
            }
        }
        return sqlArray;
    }

    private static ArrayList<String> getHeaderTypes(String tableName) throws SQLException {
        ArrayList<String> typeMap = new ArrayList<>();
        String query;
        Connection connection = getSQLConnection(new Setup());

        query = "SELECT DATA_TYPE from information_schema.columns where table_name =  '" + tableName + "';";
        try {
            Statement statement = connection.createStatement();
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                String result = rs.getString(1);
                System.out.println("result = " + result);
                typeMap.add(result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw e;
        }

        System.out.println("typeMap = " + typeMap.toString());
        return typeMap;
    }

    private static String buildInsertQuery(String tableName, String data, ArrayList<String> typeMap) {
        StringBuilder values = new StringBuilder();
        String[] dataList = data.split(",");
        for (int i = 0; i < dataList.length; i++) {
            if (typeMap.get(i).toLowerCase().equals("int") || typeMap.get(i).toLowerCase().equals("float") || typeMap.get(i).toLowerCase().equals("bigint")) {
                values.append(dataList[i]);
            } else if (typeMap.get(i).toLowerCase().equals("varchar")) {
                dataList[i] = dataList[i].replace("\"", "");
                if (dataList[i].contains("'")) {
                    dataList[i] = dataList[i].replace("'", "\\\'");
                }
                values.append("'").append(dataList[i]).append("'");
            }

            if (i != dataList.length - 1) {
                values.append(",");
            }
        }

        return "INSERT INTO "
                + tableName
//                + "(" + headers + ")"
                + " VALUES "
                + "(" + values + ");";
    }
}
