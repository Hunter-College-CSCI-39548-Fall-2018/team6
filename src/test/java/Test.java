import com.travelfilters.web.payload.SurveyRequest;
import com.travelfilters.web.security.UserPrincipal;
import net.minidev.json.JSONObject;

import java.util.HashMap;

import static com.travelfilters.web.controller.SurveyController.buildResponse;
import static com.travelfilters.web.controller.SurveyController.calculateResults;
import static com.travelfilters.web.controller.SurveyController.saveRequest;

public class Test {
    public static void main(String... args) {
        SurveyRequest surveyRequest;
        // for testing purposes
        surveyRequest = new SurveyRequest();
        surveyRequest.setClimate(20);
        surveyRequest.setExpensive(10);
        surveyRequest.setPopulation(30);
        surveyRequest.setPrecipitation(50);
        surveyRequest.setDensity(60);
        surveyRequest.setBusy(100);
        surveyRequest.setAirport("JFK");
        surveyRequest.setStartDate("05-21-2018");
        surveyRequest.setEndDate("08-30-2018");

        UserPrincipal newUser = new UserPrincipal(-1L, "wjefoij", "WEJFOIJ", null);
        saveRequest(newUser, surveyRequest);
        HashMap<String, Integer> results = calculateResults(surveyRequest);
        buildResponse(results);
    }
}
