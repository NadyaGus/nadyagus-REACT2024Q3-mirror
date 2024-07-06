import { Component } from 'react';

import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';
import { Loader } from '@/features/loader/loader';
import { Results } from '@/features/results/results';
import { Search } from '@/features/search/search';
import { LS_KEY } from '@/utils/variables';

interface PageState {
  handleSearchValue: (value: string) => void;
  isLoading: boolean;
  searchValue: string;
  setLoadingState: (isLoading: boolean) => void;
}

export class SearchPage extends Component {
  state: PageState = {
    handleSearchValue: this.handleSearchValue.bind(this),
    isLoading: true,
    searchValue: localStorage.getItem(LS_KEY) ?? '',
    setLoadingState: this.setLoadingState.bind(this),
  };

  handleSearchValue(value: string): void {
    this.setState({ searchValue: value });
  }

  render(): React.ReactNode {
    return (
      <>
        <Header />
        <Search handleSearchValue={this.state.handleSearchValue} searchValue={this.state.searchValue} />
        <Results
          handleLoading={this.state.setLoadingState}
          isLoading={this.state.isLoading}
          searchValue={this.state.searchValue}
        />
        <Footer />
        <Loader isLoading={this.state.isLoading} />
      </>
    );
  }

  setLoadingState(isLoading: boolean): void {
    this.setState({ isLoading });
  }
}