import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { kcSanitize } from "@keycloakify/login-ui/kcSanitize";
import { assert } from "tsafe/assert";
import { useKcContext } from "../../KcContext";
import { useI18n } from "../../i18n";

export function Form() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "login-reset-password.ftl");

    const { msg, msgStr } = useI18n();

    return (
        <form
            id="kc-reset-password-form"
            className="space-y-3"
            action={kcContext.url.loginAction}
            method="post"
        >
            <Field>
                <FieldLabel htmlFor="username">
                    {" "}
                    {!kcContext.realm.loginWithEmailAllowed
                        ? msg("username")
                        : !kcContext.realm.registrationEmailAsUsername
                          ? msg("usernameOrEmail")
                          : msg("email")}
                </FieldLabel>
                <Input
                    type="text"
                    id="username"
                    name="username"
                    autoFocus
                    defaultValue={kcContext.auth.attemptedUsername ?? ""}
                    aria-invalid={kcContext.messagesPerField.existsError("username")}
                />
                {kcContext.messagesPerField.existsError("username") && (
                    <FieldError>
                        <span
                            id="input-error"
                            aria-live="polite"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(
                                    kcContext.messagesPerField.getFirstError("username")
                                )
                            }}
                        />
                    </FieldError>
                )}
            </Field>

            <Button
                className="w-full bg-[#5e17eb] hover:bg-[#4a12bc] text-white font-medium"
                type="submit"
            >
                {msgStr("doSubmit")}
            </Button>

            <div className="flex justify-end mt-4">
                <a
                    id="backToApplication"
                    href={kcContext.url.loginUrl}
                    className="text-sm text-[#5e17eb] hover:text-[#4a12bc] font-medium"
                >
                    {msg("backToApplication")}
                </a>
            </div>
        </form>
    );
}
