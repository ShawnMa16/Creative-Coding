JSONArray rawCrimeJSON;
JSONObject rawWeatherJSON;
JSONArray weatherDetails;

public static int [] cnNewcastle = new int[5];
public static int [] cnLondon = new int[5];
public static int [] cnManchester = new int[5];

  //weather information
public static float [] Newcastle =  new float[40];
public static float [] London =  new float[40];
public static float [] Manchester =  new float[40];

int y= 0;

int howManyDepts = 5;
int withinEachDept = 3;
int[][] barHeights = new int[howManyDepts][withinEachDept];
int k = 0;
//int labelArea = 50;
int graphHeight = 750;


String cDate[] = {"2013-01", "2013-02", "2013-03", "2013-04", "2013-05"};
String cDateForecast[] = {"2017-03-13", "2017-03-14", "2017-03-15", "2017-03-16", "2017-03-17"};
String cCity[] = {"Newcastle", "London", "Manchester"};

String lat[] = {"54.9738435", "51.5073907", "53.4721631"};
String lon[] = {"-1.6132306", "-0.1298886", "-2.3640113"};


void setup() {
  size(1395, 800); 

  //crime data information
  cnNewcastle= getCrimeNum(cDate, lat[0], lon[0]);
  cnLondon = getCrimeNum(cDate, lat[1], lon[1]);
  cnManchester = getCrimeNum(cDate, lat[2], lon[2]);

  //weather information
  Newcastle = getWeatherTemp(cCity[0]);
  London = getWeatherTemp(cCity[1]);
  Manchester = getWeatherTemp(cCity[2]);




  println (cnNewcastle);
  println (Newcastle);

  println (cnLondon);
  println (London);

  println (cnManchester);
  println (Manchester);
 
  
}


void draw() {

  //println (Newcastle);

  background(45);
  
 //label backgrounds
  fill(75);
  rect(0,760,279,100);
  fill(100);
  rect(279,760,279,100);  
  fill(75);
  rect(558,760,279,100);
  fill(100);
  rect(837,760,279,100);  
  fill(75);
  rect(1116,760,279,100);   
  
  //graph backgrounds
  fill(75);
  rect(0,0,93,750);
  fill(100);
  rect(93,0,93,750);
  fill(75);
  rect(186,0,93,750); 
  fill(100);
  rect(279,0,93,750);
  fill(75);
  rect(372,0,93,750); 
  fill(100);
  rect(465,0,93,750); 
  fill(75);
  rect(558,0,93,750); 
  fill(100);
  rect(651,0,93,750); 
  fill(75);
  rect(744,0,93,750); 
  fill(100);
  rect(837,0,93,750); 
  fill(75);
  rect(930,0,93,750);  
  fill(100);
  rect(1023,0,93,750);
  fill(75);
  rect(1116,0,93,750); 
  fill(100);
  rect(1209,0,93,750); 
  fill(75);
  rect(1302,0,93,750);
  
  y-=20;
  for(int i = 0; i < 5; i++) {
  barHeights[i][0] = cnNewcastle[i]/4;
  barHeights[i][1] = cnLondon[i]/4;
  barHeights[i][2] = cnManchester[i]/4;
}


for(int i = 0; i < howManyDepts; i++) {
    fill(0);
    textSize(32);
    text(cDateForecast[i], i*(width/howManyDepts)+5, height-7);
    textSize(32);

  for(int j = 0; j < (withinEachDept/withinEachDept); j++) {

      float r = random(0, 255);
      float g = random(0, 255);
      float b = random(0, 255);
      
      fill(r, g, b);
            
      for(int l = 0; l < withinEachDept; l++){  
        
        //change the color of each rect.
        //if(l==0)
        //  fill(0, 255, 0);
        //if(l==1)
        //  fill(0, 0, 255);
        //if(l==2)
        //  fill(255, 0, 0);
          
        rect(k, graphHeight-barHeights[i][j]/3, width/(howManyDepts*withinEachDept), barHeights[i][j]/3);
        k+=(width/(howManyDepts*withinEachDept));
        j++;
      }
  }
}

  stroke(0, 255, 0);
  strokeWeight(2);
  for (int i = 0; i < Newcastle.length-1; i++) {
    float x1 = i * (1395/Newcastle.length+1);
    float y1 = (Newcastle[i] * 40);
    float x2 = (i+1) * (1395/Newcastle.length+1);
    float y2 =  (Newcastle[i+1] * 40);

    line(x1, y1, x2, y2);
  }
  noLoop();
  
  stroke(0, 0, 255);
  strokeWeight(2);
  for (int i = 0; i < Manchester.length-1; i++) {
    float x1 = i * (1395/Newcastle.length+1);
    float y1 = (Manchester[i] * 40);
    float x2 = (i+1) * (1395/Newcastle.length+1);
    float y2 =  (Manchester[i+1] * 40);

    line(x1, y1, x2, y2);
  }
  noLoop();
  
  stroke(255, 0, 0);
  strokeWeight(2);
  for (int i = 0; i < London.length-1; i++) {
    float x1 = i * (1395/Newcastle.length+1);
    float y1 = (London[i] * 40);
    float x2 = (i+1) * (1395/Newcastle.length+1);
    float y2 =  (London[i+1] * 40);

    line(x1, y1, x2, y2);
  }
  noLoop();

}

int [] getCrimeNum(String []date, String lat, String lon)
  {  

    int crimeNumber[] = new int[5];

    for (int i = 0; i < 5; i++)
    {
      String crime = "https://data.police.uk/api/crimes-street/all-crime?lat=" + lat + "&lng=" + lon + "&date="+date[i];

      rawCrimeJSON = loadJSONArray(crime);
     
      crimeNumber[i] = rawCrimeJSON.size();
       
    }


    return crimeNumber;
  }

float [] getWeatherTemp(String city)
  {
    String url ="http://api.openweathermap.org/data/2.5/forecast?q=" + city + ",UK&appid=f35676b73eee86239e5e2b7ace586d33";

    rawWeatherJSON = loadJSONObject(url);
    weatherDetails = rawWeatherJSON.getJSONArray("list");

    float tempWeather[] = new float[weatherDetails.size()];

    for (int i = 0; i < weatherDetails.size(); i++)
    {
      JSONObject tempJSON = weatherDetails.getJSONObject(i);
      JSONObject timeTemp = tempJSON.getJSONObject("main");
      float accuTemp = timeTemp.getFloat("temp") - 273.15F;
      tempWeather[i] = accuTemp;
    }

    return tempWeather;
  }