import org.apache.commons.configuration2.Configuration;
import org.apache.commons.configuration2.builder.fluent.Configurations;
import org.apache.commons.configuration2.ex.ConfigurationException;

import java.io.File;

public class Setup {

    private Configuration config = null;

    Setup() {
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
}
