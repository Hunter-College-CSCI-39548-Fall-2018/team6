package com.travelfilters.web.connector;

import org.apache.commons.configuration2.Configuration;
import org.apache.commons.configuration2.builder.fluent.Configurations;
import org.apache.commons.configuration2.ex.ConfigurationException;

import java.io.File;
import java.sql.*;

public class SQLConnector {
    private static Configuration config = null;

    public SQLConnector() {
        getConfig();
    }

    Configuration getConfig() {
        if (config == null) {
            Configurations configs = new Configurations();
            try {
                config = configs.properties(new File("mysql.properties"));
            } catch (ConfigurationException cex) {
                System.err.println("Could not find mysql.properties!");
            }
        }
        return config;
    }

    public ResultSet executeSql(String sql) {
        try {
            String url = config.getString("mysql.url");
            String username = config.getString("mysql.username");
            String password = config.getString("mysql.password");

            Connection connection = DriverManager.getConnection(url, username, password);
            connection.setAutoCommit(false);
            Statement stmt = connection.createStatement();
            ResultSet resultSet = stmt.executeQuery(sql);
            connection.commit();
            connection.close();
            return resultSet;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
}
