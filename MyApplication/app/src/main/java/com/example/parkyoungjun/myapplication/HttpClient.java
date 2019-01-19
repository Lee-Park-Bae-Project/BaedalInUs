package com.example.parkyoungjun.myapplication;
import com.loopj.android.http.*;
public class HttpClient {

    private static final String BASE_URL="";
    private static AsyncHttpClient client = new AsyncHttpClient();

    public static AsyncHttpClient getInstance(){
        return HttpClient.client;
    }

    public static void get(String url,RequestParams params,AsyncHttpResponseHandler responseHandler)
    {
        client.get(getAbsoluteUrl(url),params,responseHandler);
    }
    public static void post(String url,RequestParams params,AsyncHttpResponseHandler responseHandler)
    {
        client.post(getAbsoluteUrl(url),params,responseHandler);
    }
    private static String getAbsoluteUrl(String relativeUrl){
        return BASE_URL + relativeUrl;
    }
}
