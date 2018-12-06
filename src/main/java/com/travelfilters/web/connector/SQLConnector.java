package com.travelfilters.web.connector;

import org.apache.commons.configuration2.Configuration;
import org.apache.commons.configuration2.builder.fluent.Configurations;
import org.apache.commons.configuration2.ex.ConfigurationException;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class SQLConnector {
    private static Configuration config = null;

    public SQLConnector() {
        config = getConfig();
    }

    static Configuration getConfig() {
        if (config == null) {
            Configurations configs = new Configurations();
            try {
                Path path = Paths.get("");
                File mysql_file = new File(path + "src/test/resources/mysql.properties");
//                System.out.println("config.location = " + mysql_file.getAbsolutePath());
                config = configs.properties(mysql_file);
            } catch (ConfigurationException cex) {
                System.err.println("Could not find mysql.properties!");
            }
        }
        return config;
    }

    public static Connection getConnection() {
        config = getConfig();
        try {
            String url = config.getString("mysql.url");
            String username = config.getString("mysql.username");
            String password = config.getString("mysql.password");

            Connection connection = DriverManager.getConnection(url, username, password);
            connection.setAutoCommit(false);
            return connection;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
}
