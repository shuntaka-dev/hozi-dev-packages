import styles from '../styles/Home.module.scss';
import convertToHoziDevHtml from '../../packages/markdown-to-html/build';
import * as He from 'he';
import fs from 'fs';
import { useState } from 'react';

export const getStaticProps = async () => {
  const testArticleData = fs.readFileSync('./testData/articles/1.md');
  const html = convertToHoziDevHtml(testArticleData.toString());

  return {
    props: {
      html: html,
    },
    revalidate: 1,
  };
};

const Home = ({ html }) => {
  const [color, setColor] = useState<string>('light');

  return (
    <div className={styles.base}>
      <div className={styles.editor}>
        <div className={styles.content}>
          <div className="hozi-dev-article-content">
            <div
              className={`hozi-dev-article-content-${color}`}
              dangerouslySetInnerHTML={{
                __html: He.unescape(html),
              }}
            ></div>
          </div>
        </div>
        <div className={styles.rightSideBar}>
          color:{' '}
          <button
            className={styles.colorButton}
            onClick={() => {
              color === 'light' ? setColor('dark') : setColor('light');
            }}
          >
            {color === 'light' ? 'dark' : 'light'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
