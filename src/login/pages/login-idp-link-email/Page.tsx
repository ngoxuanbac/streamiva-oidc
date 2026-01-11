import { Alert, AlertDescription } from "@/components/ui/alert";
import { useI18n } from "@/login/i18n";
import { useKcContext } from "@/login/KcContext";
import { assert } from "tsafe/assert";
import { Template } from "../../components/Template";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "login-idp-link-email.ftl");

    const { msg } = useI18n();

    return (
        <Template
            headerNode={
                <div className="text-center">
                    <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                        {msg("emailLinkIdpTitle", kcContext.idpAlias)}
                    </p>
                </div>
            }
        >
            <Alert id="instruction1" variant="info" className="my-3">
                <AlertDescription>
                    {msg(
                        "emailLinkIdp1",
                        kcContext.idpAlias,
                        kcContext.brokerContext.username,
                        kcContext.realm.displayName
                    )}
                </AlertDescription>
            </Alert>

            <div className="space-y-2 text-sm text-muted-foreground">
                <p className="leading-relaxed">
                    {msg("emailLinkIdp2")}{" "}
                    <a
                        href={kcContext.url.loginAction}
                        className="inline-flex items-center gap-1 text-[#5e17eb] hover:text-[#4a12bc] underline underline-offset-2"
                    >
                        {msg("doClickHere")}
                    </a>{" "}
                    {msg("emailLinkIdp3")}
                </p>

                <p className="leading-relaxed">
                    {msg("emailLinkIdp4")}{" "}
                    <a
                        href={kcContext.url.loginAction}
                        className="inline-flex items-center gap-1 text-[#5e17eb] hover:text-[#4a12bc] underline underline-offset-2"
                    >
                        {msg("doClickHere")}
                    </a>{" "}
                    {msg("emailLinkIdp5")}
                </p>
            </div>
        </Template>
    );
}
