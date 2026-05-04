import {cookies} from 'next/headers';
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async (params) => {
    const store = await cookies();
    const locale = params.locale || store.get('locale')?.value || 'kh';
    const messages = (await import(`../../messages/${locale}.json`)).default
    
    return {
        locale,
        messages,
    };
});