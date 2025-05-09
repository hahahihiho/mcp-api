export async function requestApi(url: string, method: string, payload?:Record<string,any> ): Promise<any> {
    try {
      let query = '';
      if(payload && Object.keys(payload).length != 0){
        query = method === 'GET' ? `?${new URLSearchParams(payload).toString()}` : '';
      }
      const baseUrl = 'https://jsonplaceholder.typicode.com'
      const fetchUrl = `${baseUrl}${url}${query}`
      const headers = <Record<string,string>>{
        'Content-Type': 'application/json',
      }
      const response = await fetch(fetchUrl, {
        method,
        headers,
        ...(['POST','PUT'].includes(method) ? { body: JSON.stringify(payload) } : {})
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status} 오류: ${errorText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API 요청 실패:', error);
      throw error;
    }
}
  
