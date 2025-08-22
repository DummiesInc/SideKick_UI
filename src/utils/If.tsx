import { PropsWithChildren, ReactNode } from 'react';

type Type1 = PropsWithChildren;
type Type2 = { then: ReactNode; else?: ReactNode };

type Props = { condition: boolean } & (Type1 | Type2);

const If = (props: Props) => {
  if ('children' in props) {
    const { condition, children } = props;
    return condition ? <>{children}</> : null;
  }

  if ('then' in props) {
    const { condition, then, else: otherwise } = props;

    if (otherwise != undefined && otherwise != null) {
      return condition ? <>{then}</> : <>{otherwise}</>;
    } else {
      return condition ? <>{then}</> : null;
    }
  }

  return null;
};

export default If;
