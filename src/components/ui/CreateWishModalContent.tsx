import { useState } from "react";
import CreateWishForm, {
  type CreateWishFormProps,
} from "../../features/wishlists/CreateWish/CreateWishForm";
import ScrapWishForm from "../../features/wishlists/CreateWish/ScrapWishForm";

interface CreateWishModalContentProps extends CreateWishFormProps {
  setModeNone: () => void;
}

const CreateWishModalContent = ({
  ...formProps
}: CreateWishModalContentProps) => {
  const [tab, setTab] = useState<"form" | "url">("form");

  return (
    <div>
      <div className="dashboard-nav">
        <div
          onClick={() => setTab("form")}
          className={`tab ${tab === "form" ? "active" : ""}`}
        >
          Créer
        </div>
        <div
          onClick={() => setTab("url")}
          className={`tab ${tab === "url" ? "active" : ""}`}
        >
          Importer
        </div>
      </div>

      {/* Contenu de la modale */}

      <div className="dashboard-content">
        {tab === "form" && <CreateWishForm {...formProps} />}
        {tab === "url" && <ScrapWishForm />}
      </div>
    </div>
  );
};

export default CreateWishModalContent;
