import com.travelfilters.web.payload.SurveyRequest;
import com.travelfilters.web.security.UserPrincipal;

import java.util.HashMap;

import static com.travelfilters.web.controller.HistoryController.buildHistory;
import static com.travelfilters.web.controller.SurveyController.*;


public class Test {
    public static void main(String... args) {
        testSurvey();
        testHistory();
//        testImage();
    }

    public static void testSurvey() {
        SurveyRequest surveyRequest;
        // for testing purposes
        surveyRequest = new SurveyRequest();
        surveyRequest.setClimate(50);
        surveyRequest.setExpensive(100);
        surveyRequest.setPopulation(40);
        surveyRequest.setPrecipitation(80);
        surveyRequest.setDensity(100);
        surveyRequest.setBusy(100);
        surveyRequest.setStartAirport("JFK");
        surveyRequest.setStartDate("05-21-2018");
        surveyRequest.setEndDate("08-30-2018");

        UserPrincipal newUser = new UserPrincipal(4L, "wjefoij", "WEJFOIJ", null);
        saveRequest(newUser, surveyRequest, true);
        HashMap<String, Integer> results = calculateResults(surveyRequest);
        buildResponse(results);
    }

    public static void testHistory() {
        UserPrincipal newUser = new UserPrincipal(-1L, "wjefoij", "WEJFOIJ", null);
        String jsonString = buildHistory(newUser);
        System.out.println("jsonString = " + jsonString);
    }

}
