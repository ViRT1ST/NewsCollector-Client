import React, { Component } from 'react';

import PageArticles from '../page-articles/page-articles';
import ApiService from '../../services/api-service';

export default class PageArticlesUnreaded extends Component {

  apiService = new ApiService();

  render() {

    const articleBtns = [
      { label: 'SAVE',
        classes: 'news-list-item__btn save',
        apiMethod: this.apiService.saveUnreadedArticle
      },
      { label: 'DELETE',
        classes: 'news-list-item__btn delete',
        apiMethod: this.apiService.hideUnreadedArticle
      }
    ];

    const apiMethodToGetArticles = this.apiService.getUnreadedNews;
    const noNewsMsg = `News is updated every 5 minutes.
                       Return here later if you don't see any news now.`;

    return (
      <PageArticles
        apiMethodToGetArticles={apiMethodToGetArticles}
        articleBtns={articleBtns}
        noNewsMsg={noNewsMsg}
      />
    );
  }

}
