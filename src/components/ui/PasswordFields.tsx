import InputField from "../forms/InputField";

type PasswordFieldsProps = {
  currentPassword?: string;
  newPassword: string;
  confirmPassword: string;
  showCurrentPassword?: boolean;
  showNewPassword: boolean;
  showValidationRules?: boolean;
  passwordsMatch: boolean;
  passwordValidity: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    digit: boolean;
    specialChar: boolean;
  };
  onCurrentPasswordChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onNewPasswordChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onConfirmPasswordChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  onToggleShowCurrentPassword?: () => void;
  onToggleShowNewPassword: () => void;
  currentPasswordRequired?: boolean;
  labels?: {
    newPassword?: string;
    confirmPassword?: string;
  };
};

const PasswordFields: React.FC<PasswordFieldsProps> = ({
  currentPassword,
  newPassword,
  confirmPassword,
  showCurrentPassword = false,
  showNewPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onToggleShowCurrentPassword,
  onToggleShowNewPassword,
  passwordsMatch,
  passwordValidity,
  showValidationRules = true,
  currentPasswordRequired = false,
  labels,
}) => {
  return (
    <>
      {currentPassword !== undefined && (
        <>
          <label htmlFor="currentPassword">
            Mot de passe actuel{" "}
            <span className="required-marker" aria-hidden="true">
              *
            </span>{" "}
            : <span className="sr-only">(obligatoire)</span>
          </label>
          <div className="input-validation">
            <InputField
              id="currentPassword"
              name="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={onCurrentPasswordChange ?? (() => {})}
              required={currentPasswordRequired}
            />
            <button
              type="button"
              className="input-info"
              onClick={onToggleShowCurrentPassword}
            >
              <i
                className={`fa-solid ${
                  showCurrentPassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </button>
          </div>
        </>
      )}

      <label htmlFor="password">
        {labels?.newPassword || "Nouveau mot de passe"}{" "}
        <span className="required-marker" aria-hidden="true">
          *
        </span>{" "}
        : <span className="sr-only">(obligatoire)</span>
      </label>
      <div className="input-validation">
        <InputField
          id="password"
          name="password"
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={onNewPasswordChange}
          required
        />
        <button
          type="button"
          className="input-info"
          onClick={onToggleShowNewPassword}
        >
          <i
            className={`fa-solid ${
              showNewPassword ? "fa-eye-slash" : "fa-eye"
            }`}
          ></i>
        </button>
      </div>

      {showValidationRules && (
        <ul>
          <li>
            <i
              className={`fa-solid ${
                passwordValidity.length
                  ? "fa-circle-check valid"
                  : "fa-circle-exclamation"
              }`}
            />{" "}
            Minimum 8 caractères
          </li>
          <li>
            <i
              className={`fa-solid ${
                passwordValidity.uppercase
                  ? "fa-circle-check valid"
                  : "fa-circle-exclamation"
              }`}
            />{" "}
            Au moins 1 majuscule
          </li>
          <li>
            <i
              className={`fa-solid ${
                passwordValidity.lowercase
                  ? "fa-circle-check valid"
                  : "fa-circle-exclamation"
              }`}
            />{" "}
            Au moins 1 minuscule
          </li>
          <li>
            <i
              className={`fa-solid ${
                passwordValidity.digit
                  ? "fa-circle-check valid"
                  : "fa-circle-exclamation"
              }`}
            />{" "}
            Au moins 1 chiffre
          </li>
          <li>
            <i
              className={`fa-solid ${
                passwordValidity.specialChar
                  ? "fa-circle-check valid"
                  : "fa-circle-exclamation"
              }`}
            />{" "}
            Au moins 1 caractère spécial
          </li>
        </ul>
      )}

      <label htmlFor="confirmPassword">
        {labels?.confirmPassword || "Confirmer le mot de passe"}{" "}
        <span className="required-marker" aria-hidden="true">
          *
        </span>{" "}
        : <span className="sr-only">(obligatoire)</span>
      </label>
      <div className="input-validation">
        <InputField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          required
        />
        <div className={`input-info ${passwordsMatch ? "valid" : "not-valid"}`}>
          {confirmPassword.length > 0 && (
            <i
              className={`fa-solid ${
                passwordsMatch ? "fa-circle-check" : "fa-circle-exclamation"
              }`}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PasswordFields;
