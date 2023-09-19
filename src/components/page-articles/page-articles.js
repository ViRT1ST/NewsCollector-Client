import './page-articles.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ArticleItem from '../article-item/article-item';
import AppMessage from '../app-message/app-message';
import AppSpinner from '../app-spinner/app-spinner';

export default class PageArticles extends Component {

  state = {
    articles: [],
    count: 0,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateItems();
  }

  onFetchLoading = () => {
    this.setState({
      articles: [],
      count: 0,
      loading: true,
      error: false
    });
  };

  onFetchError = (err) => {
    console.log(err);
    this.setState({
      articles: [],
      count: 0,
      loading: false,
      error: true
    });
  };

  onFetchLoaded = (json) => {
    this.setState({
      articles: json.data,
      count: json.data.length,
      loading: false,
      error: false
    });
  };

  updateItems = () => {
    this.onFetchLoading();

    const { apiMethodToGetArticles } = this.props;

    apiMethodToGetArticles()
      .then(this.onFetchLoaded)
      .catch(this.onFetchError);
  };

  decrementCount = () => {
    const { count } = this.state;
    const timeoutToAvoidAnimationConflict = 300;

    setTimeout(() => {
      this.setState(() => {
        return {
          count: count - 1
        };
      });
    }, timeoutToAvoidAnimationConflict);
  };

  render() {
    const { articleBtns, noNewsMsg } = this.props;
    const { articles, count, loading, error } = this.state;

    if (loading) {
      return <AppSpinner />;
    }

    if (error) {
      return <AppMessage message="Server error." />;
    }

    if (!count) {
      return <AppMessage message={noNewsMsg} />;
    }

    if (count) {
      const articleItems = articles.map(({ _id, date, site, section, title, url }) => {
        return (
          <ArticleItem
            key={_id}
            id={_id}
            date={date}
            site={site}
            section={section}
            title={title}
            url={url}
            articleBtns={articleBtns}
            decrementCount={this.decrementCount}
          />
        );
      });

      return (
        <ul className="news-list">
          {articleItems}
        </ul>
      );
    }
  }
}

PageArticles.propTypes = {
  apiMethodToGetArticles: PropTypes.func,
  noNewsMsg: PropTypes.string,
  articleBtns: PropTypes.instanceOf(Array),
};
