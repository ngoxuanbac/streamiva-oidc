import { assert } from "tsafe/assert";
import { useKcContext } from "../../KcContext";
import { Template } from "../../components/Template";
import { useI18n } from "../../i18n";
import { Form } from "./Form";

export function Page() {
    const { kcContext } = useKcContext();
    assert(kcContext.pageId === "register.ftl");

    const { msg, advancedMsg } = useI18n();

    return (
        <Template
            headerNode={
                <div className="text-center">
                    <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                        {kcContext.messageHeader !== undefined
                            ? advancedMsg(kcContext.messageHeader)
                            : msg("registerTitle")}
                    </p>
                </div>
            }
            displayMessage={kcContext.messagesPerField.exists("global")}
        >
            <Form />
        </Template>
    );
}
