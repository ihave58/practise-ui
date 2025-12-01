import { type FC, type ReactNode } from 'react';
import cx from 'classnames';
import styles from './LinkedTabs.module.css';

type LinkedTabsProps = {
    tabs: Array<{
        title: string;
        body: ReactNode
    }>;
};

const LinkedTabs: FC<LinkedTabsProps> = (props) => {
    const { tabs = [] } = props;
    const searchParams = new URLSearchParams(window.location.search);
    const tabIndexFromUrl = searchParams.get('tabIndex');
    const selectedTabIndex = Number.isNaN(Number(tabIndexFromUrl)) ? 0 : Number(tabIndexFromUrl);

    console.log(selectedTabIndex);

    return (
        <div className={styles.linkedTabs}>
            <div className={styles.tabsHeader}>
                {
                    tabs.map((tab, tabIndex) => {
                        const updatedSearchParams = new URLSearchParams(window.location.search);
                        updatedSearchParams.set('tabIndex', tabIndex.toString());

                        const url = new URL(window.location.href);
                        url.search = updatedSearchParams.toString();

                        const link = url.toString();

                        return (
                            <a key={tab.title}
                               className={cx([styles.tabHeader, { [styles.selected]: selectedTabIndex === tabIndex }])}
                               href={link}
                            >
                                {tab.title}
                            </a>
                        );
                    })
                }
            </div>
            <div className={styles.tabsBody}>
                {
                    tabs.map((tab, tabIndex) => {
                        const tabBodyStyles = [
                            styles.tabBody,
                            {
                                [styles.active]: selectedTabIndex === tabIndex
                            }
                        ];

                        return (
                            <div
                                key={tab.title}
                                className={cx(tabBodyStyles)}>
                                {tab.body}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default LinkedTabs;
