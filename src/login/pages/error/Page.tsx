import { Alert, AlertDescription } from "@/components/ui/alert";
import { kcSanitize } from "@keycloakify/login-ui/kcSanitize";
import { assert } from "tsafe/assert";
import { useKcContext } from "../../KcContext";
import { Template } from "../../components/Template";
import { useI18n } from "../../i18n";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "error.ftl");

    const { msg } = useI18n();

    return (
        <Template displayMessage={false} headerNode={msg("errorTitle")}>
            <div id="kc-error-message">
                <Alert variant="error" className="my-3">
                    <AlertDescription>
                        <span
                            className="instruction"
                            dangerouslySetInnerHTML={{
                                __html: kcSanitize(kcContext.message.summary)
                            }}
                        />
                    </AlertDescription>
                </Alert>

                {!kcContext.skipLink &&
                    kcContext.client !== undefined &&
                    kcContext.client.baseUrl !== undefined && (
                        <div className="flex justify-end">
                            <a
                                id="backToApplication"
                                href={kcContext.client.baseUrl}
                                className="text-sm text-[#5e17eb] hover:text-[#4a12bc] font-medium"
                            >
                                {msg("backToApplication")}
                            </a>
                        </div>
                    )}
            </div>
        </Template>
    );
}
