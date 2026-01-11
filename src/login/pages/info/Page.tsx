import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { kcSanitize } from "@keycloakify/login-ui/kcSanitize";
import { assert } from "tsafe/assert";
import { Template } from "../../components/Template";
import { useI18n } from "../../i18n";
import { useKcContext } from "../../KcContext";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "info.ftl");

    const { advancedMsgStr, msg } = useI18n();

    return (
        <Template
            displayMessage={false}
            headerNode={
                <span
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(
                            kcContext.messageHeader
                                ? advancedMsgStr(kcContext.messageHeader)
                                : kcContext.message.summary
                        )
                    }}
                />
            }
        >
            <Alert variant="info" className="my-3">
                <AlertDescription>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: kcSanitize(
                                (() => {
                                    let html = kcContext.message.summary;

                                    if (kcContext.requiredActions) {
                                        html += "<b>";

                                        html += kcContext.requiredActions
                                            .map(requiredAction =>
                                                advancedMsgStr(
                                                    `requiredAction.${requiredAction}`
                                                )
                                            )
                                            .join(", ");

                                        html += "</b>";
                                    }

                                    return html;
                                })()
                            )
                        }}
                    />
                </AlertDescription>
            </Alert>

            {(() => {
                if (kcContext.skipLink) {
                    return null;
                }

                if (kcContext.pageRedirectUri) {
                    return (
                        <div className="flex justify-end">
                            <a
                                href={kcContext.pageRedirectUri}
                                className="text-sm text-[#5e17eb] hover:text-[#4a12bc] font-medium"
                            >
                                {msg("backToApplication")}
                            </a>
                        </div>
                    );
                }
                if (kcContext.actionUri) {
                    return (
                        <div className="flex justify-end">
                            <a
                                href={kcContext.actionUri}
                                className="text-sm text-[#5e17eb] hover:text-[#4a12bc] font-medium"
                            >
                                {msg("proceedWithAction")}
                            </a>
                        </div>
                    );
                }

                if (kcContext.client.baseUrl) {
                    return (
                        <div className="flex justify-end">
                            <a
                                href={kcContext.client.baseUrl}
                                className="text-sm text-[#5e17eb] hover:text-[#4a12bc] font-medium"
                            >
                                {msg("backToApplication")}
                            </a>
                        </div>
                    );
                }
            })()}
        </Template>
    );
}
