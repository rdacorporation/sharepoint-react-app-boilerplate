import React from 'react';
import { AppContext } from '../../AppContext';

export class AppTitle extends React.Component<{}, AppTitleState> {
  static contextType = AppContext;
  context!: React.ContextType<typeof AppContext>;

  constructor(props: any, context?: typeof AppContext) {
    super(props, context);

    this.state = {
      title: ''
    };
  }

  async componentDidMount() {
    const title = await this.context.spService.getRootWebTitle();
    this.setState({
      title
    });
  }

  render() {
    const { title } = this.state;
    return <span id="rootWebTitle">{title}</span>;
  }
}

interface AppTitleState {
  title: string;
}
