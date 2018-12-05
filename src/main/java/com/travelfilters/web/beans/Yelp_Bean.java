package com.travelfilters.web.beans;

public class Yelp_Bean {
    private String image_url;
    private String page_url;
    private int review_count;
    private int review_score;
    private String name;

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public String getPage_url() {
        return page_url;
    }

    public void setPage_url(String page_url) {
        this.page_url = page_url;
    }

    public int getReview_count() {
        return review_count;
    }

    public void setReview_count(int review_count) {
        this.review_count = review_count;
    }

    public int getReview_score() {
        return review_score;
    }

    public void setReview_score(int review_score) {
        this.review_score = review_score;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
