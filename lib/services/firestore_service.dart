import 'package:flutter/foundation.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/models.dart';
import '../data/mock_data.dart';


class FirestoreService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  // Collection References
  CollectionReference get _subjectsRef => _db.collection('subjects');
  CollectionReference get _resourcesRef => _db.collection('resources');
  CollectionReference get _deadlinesRef => _db.collection('deadlines');

  // Stream Subjects
  Stream<List<SubjectModel>> getSubjectsStream() {
    return _subjectsRef.snapshots().map((snapshot) {
      if (snapshot.docs.isEmpty) {
        return mockSubjects;
      }
      return snapshot.docs.map((doc) {
        final data = doc.data() as Map<String, dynamic>;
        return SubjectModel(
          id: doc.id,
          code: data['code'] ?? '',
          name: data['name'] ?? '',
          program: data['program'] ?? 'BCA',
          semester: data['semester'] ?? 1,
          credits: data['credits'] ?? 4,
        );
      }).toList();
    });
  }

  // Stream Resources (Assignments, Notes, PYQs)
  Stream<List<ResourceModel>> getResourcesStream() {
    return _resourcesRef.snapshots().map((snapshot) {
      if (snapshot.docs.isEmpty) {
        return mockResources;
      }
      return snapshot.docs.map((doc) {
        final data = doc.data() as Map<String, dynamic>;
        return ResourceModel(
          id: doc.id,
          subjectCode: data['subjectCode'] ?? '',
          title: data['title'] ?? '',
          type: data['type'] ?? 'assignment',
          session: data['session'] ?? '2024-2025',
          fileSize: data['fileSize'] ?? '2.5 MB',
          statusBadge: data['statusBadge'] ?? '100% Solved',
          downloadUrl: data['downloadUrl'] ?? '#',
        );
      }).toList();
    });
  }

  // Stream Deadlines
  Stream<List<DeadlineModel>> getDeadlinesStream() {
    return _deadlinesRef.snapshots().map((snapshot) {
      if (snapshot.docs.isEmpty) {
        return mockDeadlines;
      }
      return snapshot.docs.map((doc) {
        final data = doc.data() as Map<String, dynamic>;
        return DeadlineModel(
          id: doc.id,
          title: data['title'] ?? '',
          description: data['description'] ?? '',
          dueDate: data['dueDate'] ?? '',
          category: data['category'] ?? 'Assignment',
          status: data['status'] ?? 'Open',
          officialUrl: data['officialUrl'] ?? '#',
        );
      }).toList();
    });
  }

  // Seed Default Data into Firestore
  Future<void> seedInitialData() async {
    try {
      final resDocs = await _resourcesRef.limit(1).get();
      if (resDocs.docs.isEmpty) {
        for (var res in mockResources) {
          await _resourcesRef.doc(res.id).set({
            'subjectCode': res.subjectCode,
            'title': res.title,
            'type': res.type,
            'session': res.session,
            'fileSize': res.fileSize,
            'statusBadge': res.statusBadge,
            'downloadUrl': res.downloadUrl,
            'createdAt': FieldValue.serverTimestamp(),
          });
        }
      }

      final subDocs = await _subjectsRef.limit(1).get();
      if (subDocs.docs.isEmpty) {
        for (var sub in mockSubjects) {
          await _subjectsRef.doc(sub.id).set({
            'code': sub.code,
            'name': sub.name,
            'program': sub.program,
            'semester': sub.semester,
            'credits': sub.credits,
          });
        }
      }

      final dlDocs = await _deadlinesRef.limit(1).get();
      if (dlDocs.docs.isEmpty) {
        for (var dl in mockDeadlines) {
          await _deadlinesRef.doc(dl.id).set({
            'title': dl.title,
            'description': dl.description,
            'dueDate': dl.dueDate,
            'category': dl.category,
            'status': dl.status,
            'officialUrl': dl.officialUrl,
          });
        }
      }
    } catch (e) {
      debugPrint('Firestore seed error: $e');
    }

  }
}
