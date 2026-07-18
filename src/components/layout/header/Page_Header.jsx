import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../shared/button/Button";

const Page_Header = ({ title, btnName, btnCta }) => {
  const { t } = useTranslation();
  return (
    <header className="flex items-center gap-1 justify-between">
      <h1 className="text-text-primary title_xl font-semibold">{t(title)}</h1>
      {btnName && (
        <Button
          hasFullWidth={false}
          onClick={btnCta}
          size="md"
          className="2xl:min-w-[202px]"
        >
          {t(btnName)}
        </Button>
      )}
    </header>
  );
};

export default Page_Header;
