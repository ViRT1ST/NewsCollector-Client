import React, { Component } from 'react';

// import AppPrivateArea from '../app-private-area/app-private-area';
import PageArticles from '../page-articles/page-articles';
import ApiService from '../../services/api-service';

export default class PageArticlesSaved extends Component {

  apiService = new ApiService();

  render() {

    const articleBtns = [
      { label: 'DELETE',
        classes: 'news-list-item__btn delete',
        apiMethod: this.apiService.hideSavedArticle
      }
    ];

    const apiMethodToGetArticles = this.apiService.getSavedNews;
    const noNewsMsg = 'You have not saved any news.';

    return (

      <PageArticles
        apiMethodToGetArticles={apiMethodToGetArticles}
        articleBtns={articleBtns}
        noNewsMsg={noNewsMsg}
      />

    );
  }

}
