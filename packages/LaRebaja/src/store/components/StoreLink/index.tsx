import React, { FC } from "react";
import { Link, LinkProps } from "@my-app/ui";
import { BlockComponent } from "@my-app/app/src/framework/engine/types";
import useStyles from "@my-app/app/src/framework/styleguide/hooks/useStyles";
import useChildren from "@my-app/app/src/framework/engine/hooks/useChildren";

export const StoreLink: FC<BlockComponent<LinkProps>> = ({ children, componentName, props }) => {
  const linkStyles = useStyles(props?.style)
  const childrens = useChildren({ children })
  
  if (childrens?.length) {
    return <Link {...props} style={linkStyles}>
      {childrens}
    </Link>
  }
  return (
    <Link {...props} style={linkStyles} />
  );
}