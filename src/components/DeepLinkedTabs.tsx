import { type FC, type ReactNode, useEffect, useState } from 'react';
import cx from 'classnames';
import styles from './DeepLinkedTabs.module.css';

type DeepLinkedTabsProps = {
    tabs: Array<{
        title: string;
        link: string;
        body: ReactNode
    }>;
};

const DeepLinkedTabs: FC<DeepLinkedTabsProps> = (props) => {
    const { tabs = [] } = props;
    const tabLinkFromUrl = window.location.hash;
    const tabIndexFromUrl = tabs.findIndex(tab => tab.link === tabLinkFromUrl);
    const initialTabIndex = tabIndexFromUrl >= 0 ? tabIndexFromUrl : 0;
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(initialTabIndex);

    const onHasChange = () => {
        const tabLinkFromUrl = window.location.hash;
        const tabIndexFromUrl = tabs.findIndex(tab => tab.link === tabLinkFromUrl);
        const updatedTabIndex = tabIndexFromUrl >= 0 ? tabIndexFromUrl : 0;

        setSelectedTabIndex(updatedTabIndex);
        console.log('onHasChange');
    }

    console.log(selectedTabIndex);

    useEffect(() => {
        window.addEventListener('hashchange', onHasChange);

        return () => window.removeEventListener('hashchange', onHasChange);
    }, []);

    return (
        <div className={styles.deepLinkedTabs}>
            <div className={styles.tabsHeader}>
                {
                    tabs.map((tab, tabIndex) => (
                        <a key={tab.title}
                           className={cx([styles.tabHeader, { [styles.selected]: selectedTabIndex === tabIndex }])}
                           href={tab.link}
                        >
                            {tab.title}
                        </a>
                    ))
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

export default DeepLinkedTabs;
