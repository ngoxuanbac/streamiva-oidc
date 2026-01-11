import { Button } from "@/components/ui/button";
import { clsx } from "@keycloakify/login-ui/tools/clsx";
import { useKcClsx } from "@keycloakify/login-ui/useKcClsx";
import { useLayoutEffect, useState } from "react";
import { assert } from "tsafe/assert";
import { useKcContext } from "../../KcContext";
import { UserProfileFormFields } from "../../components/UserProfileFormFields";
import { useI18n } from "../../i18n";
import { TermsAcceptance } from "./TermsAcceptance";

export function Form() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "register.ftl");
    const { kcClsx } = useKcClsx();
    const { msg, msgStr } = useI18n();

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);

    useLayoutEffect(() => {
        (window as any)["onSubmitRecaptcha"] = () => {
            // @ts-expect-error
            document.getElementById("kc-register-form").requestSubmit();
        };

        return () => {
            delete (window as any)["onSubmitRecaptcha"];
        };
    }, []);

    return (
        <form
            id="kc-register-form"
            action={kcContext.url.registrationAction}
            className="space-y-3"
            method="post"
        >
            <UserProfileFormFields
                onIsFormSubmittableValueChange={setIsFormSubmittable}
            />
            {kcContext.termsAcceptanceRequired && (
                <TermsAcceptance
                    messagesPerField={kcContext.messagesPerField}
                    areTermsAccepted={areTermsAccepted}
                    onAreTermsAcceptedValueChange={setAreTermsAccepted}
                />
            )}
            {kcContext.recaptchaRequired &&
                (kcContext.recaptchaVisible ||
                    kcContext.recaptchaAction === undefined) && (
                    <div className="form-group">
                        <div className={kcClsx("kcInputWrapperClass")}>
                            <div
                                className="g-recaptcha"
                                data-size="compact"
                                data-sitekey={kcContext.recaptchaSiteKey}
                                data-action={kcContext.recaptchaAction}
                            ></div>
                        </div>
                    </div>
                )}
            <div className={kcClsx("kcFormGroupClass")}>
                {kcContext.recaptchaRequired &&
                !kcContext.recaptchaVisible &&
                kcContext.recaptchaAction !== undefined ? (
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <button
                            className={clsx(
                                kcClsx(
                                    "kcButtonClass",
                                    "kcButtonPrimaryClass",
                                    "kcButtonBlockClass",
                                    "kcButtonLargeClass"
                                ),
                                "g-recaptcha"
                            )}
                            data-sitekey={kcContext.recaptchaSiteKey}
                            data-callback="onSubmitRecaptcha"
                            data-action={kcContext.recaptchaAction}
                            type="submit"
                        >
                            {msg("doRegister")}
                        </button>
                    </div>
                ) : (
                    <Button
                        disabled={
                            !isFormSubmittable ||
                            (kcContext.termsAcceptanceRequired && !areTermsAccepted)
                        }
                        className="w-full bg-[#5e17eb] hover:bg-[#4a12bc] text-white font-medium"
                        name="register"
                        type="submit"
                    >
                        {msgStr("doRegister")}
                    </Button>
                )}
            </div>

            <div className="flex justify-end mt-4">
                <a
                    href={kcContext.url.loginUrl}
                    className="text-sm text-[#5e17eb] hover:text-[#4a12bc] font-medium"
                >
                    {msg("backToLogin")}
                </a>
            </div>
        </form>
    );
}
