import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 50, fontFamily: 'Helvetica' },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginTop: 20, marginBottom: 10, borderBottom: '1px solid black' },
  text: { fontSize: 11, marginBottom: 4 }
});

export const ResumePDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.name}>{data.candidate_name}</Text>
      <Text style={styles.text}>Target Role: {data.target_job_title}</Text>
      <Text style={styles.sectionTitle}>PROFESSIONAL OVERVIEW</Text>
      <Text style={styles.text}>{data.content}</Text>
    </Page>
  </Document>
);