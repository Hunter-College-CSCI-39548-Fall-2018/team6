import java.io.*;
import java.util.HashMap;

public class CSVClean {
    public static void run() {
        HashMap<String, String> map = new HashMap<>();
        File file = new File("DATA/2018_Q1_Fares.csv");
        try {
            BufferedReader br = new BufferedReader(new FileReader(file));
            BufferedWriter bw = new BufferedWriter(new FileWriter("DATA/2018_Q1_Fares_CLEAN.csv"));

            String line = br.readLine();
            String[] lineArr;
            int numErrs = 0;
            int numLines = 0;

            bw.write(line + "\n");

            while (br.ready()) {

                numLines += 1;
                line = br.readLine();
                lineArr = line.split(",");
                if (Double.valueOf(lineArr[3]) < 100) {
//                    System.err.println(line);
                    numErrs += 1;
                } else {
                    map.putIfAbsent(lineArr[1] + "-" + lineArr[2] + "-" + lineArr[4], line);
//                    bw.write(lineArr[1] + "," + lineArr[2] + "," + lineArr[3] + "," + lineArr[4] + "\n");
                }
            }

            for (String entry : map.keySet()) {
                bw.write(map.get(entry) + "\n");
            }

            System.err.println("Total number of fares less than 100 = " + numErrs);
            System.err.println("Total number of fares = " + numLines);

        } catch (IOException e) {
            System.err.println("Could not find target CSV file!");
        }
    }
}
