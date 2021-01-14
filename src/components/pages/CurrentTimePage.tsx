import React from "react"
import CurrentTime from "~/src/components/blocks/CurrentTime"
import { PageHeader } from "antd"

function CurrentTimePage() {
    return (
        <div>
            <PageHeader
                className="site-page-header"
                onBack={() => null}
                title="Current time"
                subTitle="(in Switzerland)"
                backIcon={false}
            />
            <p>
                The current time in Switzerland is <CurrentTime />
            </p>
        </div>
    )
}

export default CurrentTimePage
