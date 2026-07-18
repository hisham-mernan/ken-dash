import React from "react";
import Button from "./Button";
import { useTranslation } from "react-i18next";

const Form_Actions_Btn = ({
  backBtnCta,
  mainBtnName,
  mainBtnCta,
  secondaryBtnName = "back",
  loading,
}) => {
  const { t } = useTranslation();
  return (
    <footer className="flex items-center gap-6">
      {backBtnCta && (
        <Button
          disabled={loading}
          onClick={backBtnCta}
          size="lg"
          type="secondary"
          className="lg:min-w-[194px]"
        >
          {t(secondaryBtnName)}
        </Button>
      )}
      <Button
        role="submit"
        onClick={mainBtnCta}
        disabled={loading}
        loading={loading}
        className="flex-1"
        size="lg"
      >
        {t(mainBtnName)}
      </Button>
    </footer>
  );
};

export default Form_Actions_Btn;
