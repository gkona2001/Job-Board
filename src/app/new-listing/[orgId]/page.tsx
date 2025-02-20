import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import '@radix-ui/themes';
import { TextField } from "@radix-ui/themes";
import { Box } from "@radix-ui/themes";
import {TextArea} from '@radix-ui/themes';
import { Flex } from "@radix-ui/themes";
import { Theme } from "@radix-ui/themes";
import { Radio } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import JobForm from "@/app/components/JobForm";

type PageProps = {
    params: {
        orgId: string;
    }
};

export default async function NewListingForOrgPage(props:PageProps) {
    const auth = await withAuth();
    //const {user} = await withAuth();

    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    if(!auth.user) return 'Pls log in';

    const orgId = props.params.orgId;
    const om = await workos.userManagement.listOrganizationMemberships({userId: auth.user.id, organizationId: orgId});
    const hasAccess = om.data.length > 0;
    if(!hasAccess)
    {
        return 'No Access';
    }

    return(
        <JobForm orgId={orgId} />
    );
}