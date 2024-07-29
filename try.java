string isValid(string s) {
    int freq[26]={0};
    int len = s.length();
    int max = INT_MIN;
    int min = INT_MAX;
  
    for(int i=0; i<len; i++)
    {
        freq[s[i] - 'a']++;
    }
    
    int num=0;
    int i=0;
    for(;i<26;i++){
     if(freq[i]!= 0){
         num=freq[i];
         break;
        }
    }
    for(;i<26;i++){
     if(freq[i]!= num && freq[i]!= 0){
         if(num>freq[i]){
          max=num;
          min=freq[i];
         }else{
          max=freq[i];
          min=num; 
         }
         break;
        }
    }
    if((max-min)!=1)return "NO";
    if(max==min)return "YES"
    for(; i<26; i++)
    {
       if(min!=freq[i])return "NO";
    }
    // Checking if third freq occured or not and if occured return false and break here.
 return "YES";
}