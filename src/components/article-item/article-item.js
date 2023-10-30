import './article-item.css';

import React from 'react';
import PropTypes from 'prop-types';

import { convertDateToAgo, animateWithSlideUp } from '../../services/common';

function ArticleItem({ _id, createdAt, site, section, title, url, articleBtns, decrementCount }) {

  const timeAgo = convertDateToAgo(createdAt);

  const btnsElements = articleBtns.map(({ label, classes, apiMethod }) => {
    return (
      <button
        key={label}
        className={classes}
        type="button"
        title={label}
        onClick={() => {
          animateWithSlideUp(`[name='${_id}']`);
          apiMethod(_id);
          decrementCount();
        }}
      />
    );
  });

  return (
    <li name={_id} className="news-list-item">
      <div className="news-list-item__container-a">
        <div className="news-list-item__time">{timeAgo}</div>
        <div className="news-list-item__site">{site} &middot; {section}</div>
        <div className="news-list-item__btns-container">{btnsElements}</div>
      </div>
      <div className="news-list-item__container-b">
        <a className="news-list-item__link" target="_blank" href={url}>{title}</a>
      </div>
    </li>
  );
}

ArticleItem.propTypes = {
  _id: PropTypes.string,
  createdAt: PropTypes.string,
  site: PropTypes.string,
  section: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  articleBtns: PropTypes.instanceOf(Array),
  decrementCount: PropTypes.func,
};

export default ArticleItem;
